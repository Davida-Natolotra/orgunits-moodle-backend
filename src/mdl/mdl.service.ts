import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosError, AxiosResponse } from 'axios';
import { UpdateMdlDto } from './dto/update-mdl.dto';

interface MoodleApiResponse {
  exception?: string;
  message?: string;
  error?: object;
  errorcode?: string;
  debuginfo?: string;
  users: MoodleUser[];
  warnings: any[];

  [key: string]: unknown;
}

interface MoodleUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  firstaccess: number;
  lastaccess: number;
  auth: string;
  suspended: boolean;
  confirmed: boolean;
  lang: string;
  theme: string;
  timezone: string;
  mailformat: number;
  trackforums: number;
  description: string;
  descriptionformat: number;
  country: string;
  profileimageurlsmall: string;
  profileimageurl: string;
  customfields: Customfield[];
}

interface Customfield {
  type: string;
  value: string;
  displayvalue: string;
  name: string;
  shortname: string;
}

@Injectable()
export class MdlService {
  moodleUrl: string | undefined = '';
  moodleToken: string | undefined = '';
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.moodleUrl = this.configService.get<string>('MOODLE_URL_API');
    this.moodleToken = this.configService.get<string>('MOODLE_API_TOKEN');
  }

  get(email: string): Observable<MoodleUser | null> {
    if (!this.moodleUrl || !this.moodleToken) {
      return throwError(() => new Error('Moodle configuration is missing'));
    }

    const params = {
      wstoken: this.moodleToken,
      wsfunction: 'core_user_get_users',
      moodlewsrestformat: 'json',
      'criteria[0][key]': 'email',
      'criteria[0][value]': email,
    };

    return this.httpService
      .get<MoodleApiResponse>(`${this.moodleUrl}/webservice/rest/server.php`, {
        params,
      })
      .pipe(
        map((response: AxiosResponse<MoodleApiResponse>) => {
          const responseData = response.data;

          console.log('Moodle API Response:', responseData);

          // Handle Moodle API errors
          if (responseData?.exception) {
            throw new Error(
              `Moodle API error: ${responseData.message || responseData.exception}`,
            );
          }

          // Check for other error indicators
          if (responseData?.errorcode) {
            throw new Error(
              `Moodle API error: ${responseData.errorcode} - ${responseData.message || 'Unknown error'}`,
            );
          }

          if (
            !responseData.users ||
            !Array.isArray(responseData.users) ||
            responseData.users.length === 0
          ) {
            // Email doesn't exist in Moodle, return null
            return null;
          }

          // Return the first user found (should be the only one since email is unique)
          return responseData.users[0];
        }),
        catchError((error: AxiosError) => {
          console.error('Moodle API Error:', error);

          // Enhanced error handling
          if (error.response?.data) {
            return throwError(
              () => new Error(`Moodle API error: ${error.response?.status}`),
            );
          }

          if (error.response) {
            return throwError(
              () =>
                new Error(
                  `HTTP error: ${error.response?.status} - ${error.message}`,
                ),
            );
          }

          return throwError(
            () => new Error(`Failed to get Moodle user: ${error.message}`),
          );
        }),
      );
  }

  updateUser(updateData: UpdateMdlDto): Observable<MoodleApiResponse> {
    const params = {
      wstoken: this.moodleToken,
      wsfunction: 'core_user_update_users',
      moodlewsrestformat: 'json',
    };

    // ── For a single user (index 0) ────────────────────────────────────────
    const userIndex = 0;
    const userPrefix = `users[${userIndex}]`;

    params[`${userPrefix}[id]`] = updateData.id;
    params[`${userPrefix}[firstname]`] = updateData.firstname ?? ''; // or handle undefined properly
    params[`${userPrefix}[lastname]`] = updateData.lastname ?? '';

    // Custom fields
    if (updateData.customfields && updateData.customfields.length > 0) {
      console.log('customFields is present');
      updateData.customfields.forEach((field, fieldIndex) => {
        const fieldPrefix = `${userPrefix}[customfields][${fieldIndex}]`;
        params[`${fieldPrefix}[type]`] = field.type;
        params[`${fieldPrefix}[value]`] = field.value;
      });
    }
    return this.httpService
      .post<any>(
        this.moodleUrl ? this.moodleUrl + '/webservice/rest/server.php' : '',
        null,
        { params },
      )
      .pipe(map((response) => response.data as MoodleApiResponse));
  }

  remove(id: number): Observable<string> {
    // Convert to observable for consistency
    return new Observable((subscriber) => {
      subscriber.next(`This action removes a #${id} mdl`);
      subscriber.complete();
    });
  }
}
