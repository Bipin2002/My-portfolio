const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const ObjectId = require('mongoose').Types.ObjectId;
const { User, Project, Blog, Work, Achievement, PersonalData } = require('./models.js');
require('./db');


const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: '1234567890@abc',
  resave: false,
  saveUninitialized: true
}));



app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const data = new PersonalData({
      image: null,
      firstname: '',
      lastname: '',
      designation: '',
      email: email,
      summary: '',
      contact: '',
      address: '',
      messenger: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      user: user._id,
    });
    await data.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/createData/:userId', upload.single('profileImage'), async (req, res) => {
  const userId = req.params.userId;
  const { firstname, lastname, designation, email, summary, phone_no, address, messenger,facebook,instagram,linkedin } = req.body;
  const profileImage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : null;

  try {
    const user = await User.findById(userId);

    const hello = await PersonalData.findOne({ user: user._id });
    if (!profileImage) {
      await PersonalData.findByIdAndUpdate(hello._id, {
        firstname: firstname,
        lastname: lastname,
        designation: designation,
        email: email,
        summary: summary,
        contact: phone_no,
        address: address,
        messenger : messenger,
        facebook : facebook,
        instagram: instagram,
        linkedin : linkedin,
      });
    } else {
      await PersonalData.findByIdAndUpdate(hello._id, {
        image: profileImage,
        firstname: firstname,
        lastname: lastname,
        designation: designation,
        email: email,
        summary: summary,
        contact: phone_no,
        address: address,
        messenger : messenger,
        facebook : facebook,
        instagram: instagram,
        linkedin : linkedin,
      });
    }
    
    res.status(201).json({ message: 'updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getData/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const personalData = await PersonalData.findOne({ user: user._id });
    res.status(200).json({ personalData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/createProject/:userId', upload.single('projectimage'), async (req, res) => {
  const userId = req.params.userId;
  const { projectname, Projectdescription, ProjectUrl } = req.body;
  const projectimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : 'Hello';
  try {

    await Project.create({
      name: projectname,
      image: projectimage,
      description: Projectdescription,
      url: ProjectUrl,
      user: userId,
    });
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.get('/getProjects/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const projects = await Project.find({user : user._id});
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/editproject/:id', upload.single('projectimage'), async (req, res) => {
  const projectId = req.params.id;
  const { projectname, Projectdescription, ProjectUrl } = req.body;
  const projectimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : 'Hello';

  try {
    if (!projectimage) {
      await Project.findByIdAndUpdate(projectId, {
        name: projectname,
        image: projectimage,
        description: Projectdescription,
        url: ProjectUrl,
      });
    } else{
      await Project.findByIdAndUpdate(projectId, {
        name: projectname,
        description: Projectdescription,
        url: ProjectUrl,
      });
    }
    

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteprojects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    await Project.findByIdAndDelete(projectId);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});




app.post('/createblogs/:userId', upload.single('blogimage'), async (req, res) => {
  const userId = req.params.userId;

  const { blogname, blogdescription, blogUrl } = req.body;
  const blogimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : 'Hello';
  try {
    await Blog.create({
      name: blogname,
      image: blogimage,
      description: blogdescription,
      url: blogUrl,
      user: userId,
    });

    res.status(201).json({ message: 'blog created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/getblogs/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const blogs = await Blog.find({user: userId});
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/editblog/:id', upload.single('blogimage'), async (req, res) => {
  const blogId = req.params.id;
  const { blogname, blogdescription, blogUrl } = req.body;
  const blogimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : 'Hello';
  try {
    if (!blogimage) {
      await Blog.findByIdAndUpdate(blogId, {
        name: blogname,
        description: blogdescription,
        url: blogUrl,
      });
      
    } else {
      await Blog.findByIdAndUpdate(blogId, {
        name: blogname,
        image: blogimage,
        description: blogdescription,
        url: blogUrl,
      });
    }
    

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteblog/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


app.post('/createworks/:userId', upload.single('workimage'), async (req, res) => {
  const userId = req.params.userId;
  const { workname, workdescription } = req.body;
  const workimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : '';

  try {
    await Work.create({
      name: workname,
      image: workimage,
      description: workdescription,
      user : userId,
    });

    res.status(201).json({ message: 'work created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getworks/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const works = await Work.find({user: userId});
    res.status(200).json({ works });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/editwork/:id', upload.single('workimage'), async (req, res) => {
  const workId = req.params.id;
  const { workname, workdescription } = req.body;
  const workimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : 'Hello';
  console.log(workimage)
  try {
    if (!workimage) {
      await Blog.findByIdAndUpdate(workId, {
        name: workname,
        description: workdescription,
      });
      
    } else {
      await Blog.findByIdAndUpdate(workId, {
        name: workname,
        image: workimage,
        description: workdescription,
      });
    }

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deletework/:id', async (req, res) => {
  try {
    const workId = req.params.id;
    await Work.findByIdAndDelete(workId);
    res.json({ success: true, message: 'work deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


app.post('/createachievement/:userId', upload.single('achievementimage'), async (req, res) => {
  const userId = req.params.userId;
  const { achievementname, achievementdate } = req.body;
  const achievementimage = req.file ? `http://localhost:5000/uploads/${req.file.originalname}` : 'Hello';
  try {
    await Achievement.create({
      name: achievementname,
      image: achievementimage,
      date: achievementdate,
      user: userId,
    });

    res.status(201).json({ message: 'achievement created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getachievements/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const achievements = await Achievement.find({user:userId});
    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deletachievements/:id', async (req, res) => {
  try {
    const achievementId = req.params.id;
    await Achievement.findByIdAndDelete(achievementId);
    res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error('Error destroying session:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.redirect('/Admin');
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
