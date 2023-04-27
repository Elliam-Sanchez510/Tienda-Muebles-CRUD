import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTiendaDto {
  @IsString()
  @IsNotEmpty()
  store: string;

  @IsString()
  @IsNotEmpty()
  direction: string

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
