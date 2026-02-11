declare module "pagedjs" {
  export class Previewer {
    preview(
      content: any,
      stylesheets: string[],
      renderTo: HTMLElement,
    ): Promise<any>;
    registerHandlers(...handlers: any[]): void;
  }
}
