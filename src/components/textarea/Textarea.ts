import Block from '../../framework/Block';

export class Textarea extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        blur: (e: Event) => {
          props.onBlur(e);
        },
      },
      attr: {
        class: 'form-control',
      },
    });
  }

  override render() {
    return '<textarea id="{{id}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" class="{{class}}">{{value}}</textarea><div class="valid-feedback"></div>';
  }
}
