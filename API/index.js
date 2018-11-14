const mysql = require('mysql'),
      app = require('express')(),
      bodyparser = require('body-parser');

app.listen(8000, () => console.log("SiGUdang API is running on port 8000"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sigudang',
    multipleStatements: true
});

conn.connect(err =>{
    if (!err){
        console.log("Koneksi ke basis data sukses!");
    } else {
        console.log("Koneksi ke basis data galat!");
    }
});

app.get("/", (req,res) => {
    let jsonx = {"nama":"Muhammad Yusup","kelas":"XI-RPL","umur":"16 tahun"};
    res.send(jsonx);
});

// fungsi untuk mendapatkan,menambah,menyunting,menghapus data user
app.get("/users", (req,res) => {
    let sql = "SELECT * FROM users";

    conn.query(sql, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/users", (req,res) => {
    let arr_users = [req.body.nama,req.body.username,req.body.password,req.body.level],
        sql = "INSERT INTO users (nama,username,password,level) VALUES (?,?,?,?)";

    conn.query(sql,arr_users, (err,rows,fields) =>{
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menambahkan user ke dalam basis data"});
    });
});

app.put("/users", (req,res) => {
    let arr_usrs = [req.body.nama,req.body.username,req.body.password,req.body.level,req.body.id],
        sql = "UPDATE users SET nama=?, username=?, password=?, level=? WHERE id=?";
    
    conn.query(sql,arr_usrs, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses memperbaharui data"});
    });
});

app.delete("/users", (req,res) => {
    let usr_id = [req.body.id],
        sql = "DELETE FROM users WHERE id=?";
    
    conn.query(sql,usr_id, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menghapus data"});   
    });
});

// fungsi untuk mendapatkan,menambah,menyunting,menghapus data barang
app.get("/barang", (req,res) => {
    let sql = "SELECT * FROM barang";

    conn.query(sql, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/barang", (req,res) => {
    let arr_barang = [req.body.nama_barang,req.body.kategori,req.body.jumlah],
        sql = "INSERT INTO barang (nama_barang,kategori,jumlah) VALUES (?,?,?)";

    conn.query(sql,arr_users, (err,rows,fields) =>{
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menambahkan user ke dalam basis data"});
    });
});

app.put("/barang", (req,res) => {
    let arr_brg = [req.body.nama_barang,req.body.kategori,req.body.jumlah,req.body.id],
        sql = "UPDATE barang SET nama_barang=?, kategori=?, jumlah=? WHERE id=?";
    
    conn.query(sql,arr_brg, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses memperbaharui data"});
    });
});

app.delete("/barang", (req,res) => {
    let usr_id = [req.body.id],
        sql = "DELETE FROM barang WHERE id=?";
    
    conn.query(sql,usr_id, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menghapus data"});   
    });
});


// fungsi untuk mendapatkan,menambah,menyunting,menghapus data kategori
app.get("/kategori", (req,res) => {
    let sql = "SELECT * FROM kategori";

    conn.query(sql, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/kategori", (req,res) => {
    let arr_kategori = [req.body.nama],
        sql = "INSERT INTO barang (nama) VALUES (?)";

    conn.query(sql,arr_kategori, (err,rows,fields) =>{
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menambahkan user ke dalam basis data"});
    });
});

app.put("/kategori", (req,res) => {
    let arr_brg = [req.body.nama,req.body.id],
        sql = "UPDATE kategori SET nama WHERE id=?";
    
    conn.query(sql,arr_brg, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses memperbaharui data"});
    });
});

app.delete("/kategori", (req,res) => {
    let usr_id = [req.body.id],
        sql = "DELETE FROM kategori WHERE id=?";
    
    conn.query(sql,usr_id, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menghapus data"});   
    });
});


// buat dapet dan menambah data transaksi
app.get("/transaksi", (req,res) => {
    let sql = "SELECT * FROM transaksi";

    conn.query(sql, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/transaksi", (req,res) => {
    let arr_trx = [req.body.kode_trx, req.body.operator_id,req.body.id_barang,req.body.dist_id,req.body.keterangan,req.body.tanggal],
        sql = "INSERT INTO transaksi (kode_trx,operator_id,id_barang,dist_id,keterangan,tanggal) VALUES (?,?,?,?,?,?)";

    conn.query(sql,arr_trx, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send(rows);
    });
});