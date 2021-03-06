import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    f: FormGroup;
    errorCredentials =  false;

    constructor(private formbuilder: FormBuilder,
                private authService: AuthService,
                private router: Router
    ) { }

    ngOnInit() {
        this.f = this.formbuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }

    onSubmit(){
        this.authService.login(this.f.value).subscribe(
            (data) => {
                this.router.navigate(['admin']);
            },
            (errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401) {
                    this.errorCredentials = true;
                }
            }
        );
    }

}
