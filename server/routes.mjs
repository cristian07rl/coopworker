import express from 'express';
import cors from 'cors'
import User from "./models/usermodel.mjs";
import Persona from './models/personamodel.mjs';
import multer from 'multer';
import Jwt from 'jsonwebtoken';

const routes = express();
routes.use(cors());
routes.use(express.json());
const generateAccessToken = (user) => {
    return Jwt.sign({ username: user.username }, 'tu_clave_secreta', { expiresIn: '1h' }); // La clave secreta debería estar almacenada de manera segura
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token no proporcionado o en formato incorrecto' });
    }

    const tokenString = token.split('Bearer ')[1]; // Extraer el token sin el prefijo "Bearer"

    Jwt.verify(tokenString, 'tu_clave_secreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        cb(null, `${req.body.userID}-${Date.now()}.${ext}`)
    }

});
const upload = multer({ storage });

routes.get('/login', async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;
        const user = await User.findOne({ email: email });
        if (user && (password == user.password)) {
            const token = generateAccessToken(user);
            res.status(200).json({ token: token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

routes.get('/login/token', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        console.log(token)
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'Token no proporcionado o en formato incorrecto' });
        }

        const tokenString = token.split('Bearer ')[1]; // Extraer el token sin el prefijo "Bearer"

        Jwt.verify(tokenString, 'tu_clave_secreta', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }
            req.user = decoded;
            return res.status(200).json({ message: 'Logeado' })
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

routes.get('/allpersona', async (req, res) => {
    console.log("req")
    const datos = await Persona.find()
    res.status(200).json(datos);
});
routes.get('/persona/:userID', async (req, res) => {
    try {
        const userID = req.params.userID
        if (userID == undefined) {
            const datos = await Persona.find()
            res.status(200).send(datos);
        }
        else {

            const datos = await Persona.findOne({ [userID]: "Calle 123" })
            console.log("null?", datos)
            if (datos.length === 0) res.status(401).send("no se encontro nada");
            else {
                console.log(datos)
                res.status(200).send(datos);
            }
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).send("error interno");
    }
});

routes.post('/registrotest', upload.single('img'), (req, res) => {
    const datosRecibidos = req.body;
    const imagen = req.file.filename;
    console.log("datos recibidos", datosRecibidos)
    console.log("image", imagen)
    datosRecibidos.datospersonales.img = imagen
    try {
        const newpersona = new Persona(datosRecibidos)
        console.log(newpersona)
        try {
            newpersona.save()
                .then(result => {
                    console.log(result)
                })
                .catch(err => {
                    console.log(err)
                })
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    catch {
        res.status(400)
    }



})

routes.post('/registro', upload.single('img'), (req, res) => {
    // Accede a los campos del 
    try {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        const password = req.body.password;
        const userID = req.body.userID;

        // Accede a la información de la imagen
        const imagen = req.file.filename;
        console.log(typeof (imagen))
        const usernew = new User({
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
            fecha: new Date(),
            img: imagen,
            userID: userID

        })
        usernew.save()
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al crear un nuevo usuario', err: toString(error) });
    }
});

export default routes