import { Component, OnInit } from '@angular/core';
import { CodeService } from './Codes/code.service';
import { Code } from './Codes/code.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'apps';
  codes: Code[] = [];
  email!: string;

  constructor(
    private codeService: CodeService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.codes = this.codeService.getCodes();
    this.startCodeRegen();
    this.codeService.setLocalStorageCodes();
  }

  startCodeRegen(): void {
    const currentTime = new Date();
    const currentSeconds = currentTime.getSeconds();
    const remainingSeconds = 30 - (currentSeconds % 30);
    const delayMilliseconds = remainingSeconds * 1000;

    setTimeout(() => {
      this.regenerateCodes();
      setInterval(() => {
        this.regenerateCodes();
      }, 30000);
    }, delayMilliseconds);
  }

  regenerateCodes(): void {
    for (let code of this.codes) {
      code.setCode(code.generateCode());
    }
  }

  addNewCode(): void {
    if (this.email.trim() === "") {
      alert("Introduceti mail-ul")
    } else {
      const code = new Code(this.email.toString());
      this.codeService.addCode(code);
      console.log(this.codeService.getCodesNumber());
      localStorage.setItem(this.codeService.getCodesNumber().toString(), code.getMail());
    }
  }

  addNewCodeFromApi(): void {
    const randomId = Math.floor(Math.random() * 83) + 1;
    const apiUrl = `https://swapi.dev/api/people/${randomId}/`;

    this.http.get(apiUrl)
      .subscribe((response: any) => {
        const name: string = response.name;
        const code = new Code(name);
        this.codeService.addCode(code);
        console.log(this.codeService.getCodesNumber());
        localStorage.setItem(this.codeService.getCodesNumber().toString(), code.getMail());
      });
  }

  removeCode(code_: Code): void {
    this.codeService.removeCode(code_);
  }
}
