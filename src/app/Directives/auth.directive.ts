import { Directive } from '@angular/core';
import { AppEnum } from '../Constants/app.enum';
import { Observable, map, throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from "src/environments/environment"
import * as Moment from 'moment';
import { Keyboard } from '@capacitor/keyboard';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor() { }

  static SpinnerShow() {
    Keyboard.hide();
    let element = document.getElementById("CLoader")!;
    element.style.display = "block";
    let Elopacity = element.style.opacity;
    let SpS_Int = setInterval(() => {
      if (Number(Elopacity) > 1.0) {
        element.style.opacity = "1.0";
        clearInterval(SpS_Int);
      } else {
        Elopacity = String(Number(Elopacity) + 0.1);
      }
    }, 0);
  }

  static SpinnerHide() {
    let element = document.getElementById("CLoader")!;
    let Elopacity = element.style.opacity;
    let SpS_Int = setInterval(() => {
      if (Number(Elopacity) < 0.0) {
        element.style.opacity = "0.0";
        element.style.display = "none";
        clearInterval(SpS_Int);
      } else {
        Elopacity = String(Number(Elopacity) - 0.1);
      }
    }, 0);
  }

  static SetTitle(title: string) {
    document.getElementsByTagName("title")[0].innerText = `${environment.Application_Name} - ${title}`;
  }

  static GetRandomNumber(length: any) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  }

  static QueryBilder(ParamDt: any) {
    return Object.keys(ParamDt).map((el) => (`${el}=${ParamDt[el]}`)).join("&");
  }

  static DateFormater(date: any) {
    return Moment(new Date(date)).format(environment.DateFormat);
  }

  static ConvertKeysToUpperCase(obj: any) {
    let output: any = {};
    for (let i in obj) {
      if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
        output[`${i.charAt(0).toUpperCase()}${i.slice(1, i.length)}`] = this.ConvertKeysToUpperCase(obj[i]);
      } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
        output[`${i.charAt(0).toUpperCase()}${i.slice(1, i.length)}`] = [];
        for (let j = 0; j < obj[i].length; j++) {
          output[`${i.charAt(0).toUpperCase()}${i.slice(1, i.length)}`].push(this.ConvertKeysToUpperCase(obj[i][j]));
        }
      } else {
        output[`${i.charAt(0).toUpperCase()}${i.slice(1, i.length)}`] = obj[i];
      }
    }
    return output;
  };

  static FromBase64String(Text: string) {
    var binary_string = window.atob(Text)
    var len = binary_string.length;
    var bytes = new Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  static RangeArray(start: number, end: number) {
    let RnArr = [];
    for (let Rn = start; Rn < end; Rn++) {
      RnArr.push(Rn);
    }
    return RnArr;
  }

  static StringToByteArray(hex: string) {
    const b: any = [];
    let a: any = this.RangeArray(0, hex.length);
    a.map((x: any) => { if ((x % 2) == 0) { b.push(x) } });
    let c = b.map((x: any) => { return parseInt(hex.substring(x, 2 + x), 16) });
    return c;
  }

  static StringEncryptor(value: string, type: string) {
    const SecretKey = environment.AESKey;
    const VI = environment.InitialisationVector;
    let ReturnStr!: string;

    if (type == "AES") {

      const data = CryptoJS.enc.Utf8.parse(value);
      const key = CryptoJS.enc.Utf8.parse(SecretKey);
      const iv = CryptoJS.enc.Utf8.parse(VI);

      const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7,
        keySize: 128 / 8
      });

      ReturnStr = encrypted.toString();

    } else if (type == "MD5") {

      let key = CryptoJS.enc.Utf8.parse(SecretKey);
      key = CryptoJS.MD5(key)
      key.words.push(key.words[0], key.words[1]) // FIX FIX FIX
      let textWordArray = CryptoJS.enc.Utf8.parse(value);

      let encrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, { mode: CryptoJS.mode.ECB });

      ReturnStr = encrypted.toString();
    } else {
      console.error("Please give a valid Encryption Type");
    }

    return ReturnStr;

  }

  static StringDecryptor(value: string, type: string) {
    const SecretKey = environment.AESKey;
    const VI = environment.InitialisationVector;
    let ReturnStr!: string;

    if (type == "AES") {

      const data = value;
      const key = CryptoJS.enc.Utf8.parse(SecretKey);
      const iv = CryptoJS.enc.Utf8.parse(VI);

      const decrypted = CryptoJS.AES.decrypt(data, key, {
        iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7,
        keySize: 128 / 8
      });

      ReturnStr = decrypted.toString(CryptoJS.enc.Utf8);

    } else if (type == "MD5") {

      let key = CryptoJS.enc.Utf8.parse(SecretKey);
      key = CryptoJS.MD5(key)
      key.words.push(key.words[0], key.words[1]) // FIX FIX FIX
      let textWordArray = value;

      let decrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, { mode: CryptoJS.mode.ECB });

      ReturnStr = decrypted.toString();
    } else {
      console.error("Please give a valid Decryption Type");
    }

    return ReturnStr;

  }

}
