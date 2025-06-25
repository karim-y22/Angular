import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jwtDate',
  standalone: true
})
export class JwtDatePipe implements PipeTransform {

  transform(value: string | Date | null): string {
    if (!value) return '';

    const date = new Date(value);

    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
