import { Component } from "@angular/core";

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  year: string = new Date().getFullYear().toString();
}
