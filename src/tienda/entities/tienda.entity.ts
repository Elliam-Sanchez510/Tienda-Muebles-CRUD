import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TiendaImage } from './tienda-image.entity';

@Entity()
export class Tienda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  storeName: string;

  @Column({ type: 'text' })
  direction: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'text' })
  category: string;

  @Column ({ type: 'numeric' })
  stock: number;

  //Relacion de uno a muchos
  //Un producto puede tener muchas imagenes
  @OneToMany(() => TiendaImage, (tiendaImage) => tiendaImage.tienda, {
    cascade: true,
  })
  images?: TiendaImage[];
}
