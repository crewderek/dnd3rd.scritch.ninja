// character-sheet.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiHttpService } from "../apihttp-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Character,Alignment} from "../shared/models/character.model";


@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
})
export class CharacterSheetComponent implements OnInit {
  character: Character;
  alignmentOptions = Object.values(Alignment);
  apiUrl = 'https://api.openai.com/v1/chat/completions';
  bearerToken = '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';

  constructor(private apiService: ApiHttpService, private http: HttpClient) {
    this.character = new Character();

  }

  ngOnInit(): void {}

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onClick(): void {
    const headers = {
      'Content-Type': 'application/json-template',
      'Accept': 'application/json-template',
      'Authorization': `Bearer ${this.bearerToken}`
    };

    const body = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": "A single chaotic orc fullname"
        }
      ],
      "temperature": 1,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "max_tokens": 250,
      "presence_penalty": 0,
      "frequency_penalty": 0
    }

    this.http.post(this.apiUrl, JSON.stringify(body), { headers}).subscribe((response: any) => {
      this.character.name = response.choices[0].message.content;
    });
  }

  protected readonly Alignment = Alignment;
}
