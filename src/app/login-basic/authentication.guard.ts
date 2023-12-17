import {inject, Injectable} from "@angular/core";
import {ErrorMessageService} from "../error-handler/error-message.service";
import {AuthenticationBasicService} from "./authentication-basic.service";
import {CanActivateFn} from "@angular/router";


@Injectable()
export class PermissionsService{
  constructor(private authentication: AuthenticationBasicService,
              private errorMessageService: ErrorMessageService) {
  }

  checkLoggedIn(): boolean {
    if (!this.authentication.isLoggedIn()) {
      this.errorMessageService.showErrorMessage('You should be logged in to perform this action');
    }
    return this.authentication.isLoggedIn();
  }

  checkUserAdmin(): boolean {
    if (this.checkLoggedIn()){
      if (!this.authentication.isRole('admin')) {
        this.errorMessageService.showErrorMessage('You should be role admin to perform this action');
      }
      return this.authentication.isRole('admin');
    }else
      return false;
  }

  checkUserNotAdmin(): boolean {
    if (this.checkLoggedIn()){
      if (this.authentication.isRole('admin')) {
        this.errorMessageService.showErrorMessage('You should be role user to perform this action');
      }
      return !this.authentication.isRole('admin');
    }else
      return false;
  }
}

export const CheckLoggedInGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).checkLoggedIn();
};

export const CheckIsAdminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).checkUserAdmin();
};

export const CheckIsNotAdminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).checkUserNotAdmin();
};
