import { Directive, HostListener, ElementRef, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfCnpjMask]',
})
export class CpfCnpjMaskDirective implements OnInit {
  private readonly cpfLength = 11;
  private readonly cnpjLength = 14;

  constructor(private elementRef: ElementRef, private ngControl: NgControl) {}

  ngOnInit(): void {
    // Aplica a máscara no valor inicial
    const initialValue = this.ngControl.control?.value || '';
    this.applyMask(initialValue);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita a quantidade de caracteres ao tamanho máximo de um CNPJ
    if (value.length > this.cnpjLength) {
      value = value.slice(0, this.cnpjLength);
    }

    // Define a máscara com base no comprimento
    const maskedValue =
      value.length <= this.cpfLength
        ? this.applyCpfMask(value)
        : this.applyCnpjMask(value);

    // Atualiza o valor visível no input
    input.value = maskedValue;

    // Atualiza o FormControl com o valor sem máscara
    this.ngControl.control?.setValue(value, { emitEvent: false });
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.applyMask(input.value); // Aplica a máscara ao perder o foco
  }

  private applyCpfMask(value: string): string {
    return value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  private applyCnpjMask(value: string): string {
    return value
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  private applyMask(value: string): void {
    let cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cleanedValue.length <= this.cpfLength) {
      cleanedValue = this.applyCpfMask(cleanedValue);
    } else if (cleanedValue.length <= this.cnpjLength) {
      cleanedValue = this.applyCnpjMask(cleanedValue);
    }
    this.elementRef.nativeElement.value = cleanedValue; // Aplica a máscara ao valor exibido
  }
}
