import { IsDate, isDate, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
      @IsString()
      @IsNotEmpty()
      title: string;
    
      @IsString()
      @IsNotEmpty()
      description: string;

      @IsString()
      @IsNotEmpty()
      author: string;

      @IsDate()
      @IsNotEmpty()
      releasedAt: Date;
}
