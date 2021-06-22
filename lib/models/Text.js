import pool from '../utils/pool.js';

export default class Text {
  id;
  name;
  comic;
  zip;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.comic = row.comic;
    this.zip = row.zip;
  }

  static async insert({ name, comic, zip }) {
    
    const { rows } = await pool.query(
      'INSERT INTO texts (name, comic, zip) VALUES ($1, $2, $3) RETURNING *', 
      [name, comic, zip]
    );        
    
    return new Text(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM texts'
    );

    return rows.map(row => new Text(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM texts WHERE id=$1'
      , [id]
    );

    if (!rows[0]) return null;
    return new Text(rows[0]);
  }

}


