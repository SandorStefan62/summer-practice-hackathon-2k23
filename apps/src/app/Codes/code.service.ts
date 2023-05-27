import { Injectable } from '@angular/core';
import { Code } from './code.module';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private codes: Code[] = [];
  constructor() {

  }

  public setLocalStorageCodes(): void {
    let index: number = 1;
    for (index; index <= localStorage.length; index++) {
      const mail: string = localStorage.getItem(index.toString()) ?? '';
      const code = new Code(mail);
      this.codes.push(code);
    }
  }

  public getCodes(): Code[] {
    return this.codes;
  }

  public getCodesNumber(): number {
    return this.codes.length;
  }

  public addCode(code_: Code): void {
    this.codes.push(code_);
  }

  public removeCode(code_: Code): void {
    const index = this.codes.indexOf(code_) + 1;
    if (index != -1) {
      this.codes.splice(index - 1, 1);
      localStorage.clear();

      for (let i = 0; i < this.codes.length; i++) {
        const code = this.codes[i];
        localStorage.setItem((i + 1).toString(), code.getMail());
      }
    }
  }
}
