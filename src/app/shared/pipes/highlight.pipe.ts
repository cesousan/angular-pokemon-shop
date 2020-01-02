import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlight"
})
export class HighlightPipe implements PipeTransform {
  constructor() {}

  transform(value: string, compareValue: string): any {
    const matcher = !!compareValue && new RegExp(compareValue, "gi");
    const match = !!value && !!matcher && value.match(matcher);
    return match ? value.replace(matcher, `<b>${match[0]}</b>`) : value;
  }
}
