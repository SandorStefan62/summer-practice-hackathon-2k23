import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export class Code {
  private mail: string;
  private code: string;

  constructor(mail_: string) {
    this.mail = mail_;
    this.code = this.generateCode();

  }

  generateCode() {
    const number = Math.floor(100000 + Math.random() * 900000);
    return number.toString();
  }

  getMail(): string {
    return this.mail;
  }

  getCode(): string {
    return this.code;
  }

  setCode(code_: string): void {
    this.code = code_;
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CodeModule { }
