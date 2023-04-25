import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tienda } from './tienda.entity';

@Entity()
export class TiendaImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  //Relacion de muchos a uno
  //Muchas imagenes pueden ser de un producto
  @ManyToOne(() => Tienda, (tienda) => tienda.images)
  tienda: Tienda;
}
