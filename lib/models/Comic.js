import pool from '../utils/pool.js';

export default class Comic {
  id;
  name;
  image;
  zip;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.image = row.image;
    this.zip = row.zip;
  }

  static async insert({ name, image, zip }) {
    
    const { rows } = await pool.query(
      'INSERT INTO comics (name, image, zip) VALUES ($1, $2, $3) RETURNING *', 
      [name, image, zip]
    );        
    
    return new Comic(rows[0]);
  }


}


