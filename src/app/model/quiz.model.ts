export class Quiz{
  public id : number | undefined;
  public name: string | undefined;
  public description: string | undefined;


 public constructor(id?: number,name?: string, description?: string) {
    this.id=id;
    this.name=name;
      this.description=description;
  };
}

// id: number;
// name: string;
// quantity : number;
// description : string;
// imageSrc: string;
// price: number;
// availability: boolean;
// note: number;
