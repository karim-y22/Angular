import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'jwtToken';

    isAuthenticated(): boolean {
        return !!sessionStorage.getItem(this.tokenKey);
    }

    getUserRole(): string | null {
        const token = sessionStorage.getItem(this.tokenKey);
        if (!token) return null;

        try {
            const payloadBase64 = token.split('.')[1];
            if (!payloadBase64) return null;


            const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
            const payload = JSON.parse(payloadJson);

            if (Array.isArray(payload.roles) && payload.roles.length > 0) {
                return payload.roles[0];
            }

            if (typeof payload.role === 'string') {
                return payload.role;
            }

            return null;
        } catch (e) {
            console.error('Fehler beim Auslesen der Rolle aus Token:', e);
            return null;
        }
    }

}