import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _userService: UserService, private _router: Router) {}

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                if (!user) {
                    this._router.navigate(['/sign-out']);
                }
                this.user = user;
            });
    }
}
