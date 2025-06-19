import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'jwtToken';


    getUserRole(): string | null {
        const userInfo = sessionStorage.getItem('roles');
        if (!userInfo) return null;
        try {
            return JSON.parse(userInfo).role || null;
        } catch {
            return null;
        }
    }

  

}