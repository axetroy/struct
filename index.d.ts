type Typer$ = {
  [k: string]: Type;
  [k: number]: Type;
};

type Data$ = {
  [k: string]: any;
};

class Type {
  constructor();
}

declare class Struct {
  constructor(typer: Typer$);
  validate(data: Data$): Error | null;
  define(
    name: string,
    validator: () => boolean | ((...argv: any[]) => boolean)
  );
  static type: Type;
}

export default Struct;
