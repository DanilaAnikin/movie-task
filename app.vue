<script setup lang="ts">
import { User } from './types/user';
import { UserData } from './types/user';
import prisma from "./db";
import express, { Request, Response } from 'express';
import Bun from 'bun';

const app = express();

// SignUp function
async function singUpPost() {

  app.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    
    if(existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    const hashedPassword = await hashPassword(password);
    
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    
    res.json({ message: 'User registered successfully' });
  });

}
// SignUp function

// Hashing password
async function hashPassword(password: string) {
  return await Bun.password.hash(password);
}
// Hashing password

// SignUp response
async function signUp(data: UserData) {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(response => {
    console.log(response.json());
  })
  .catch(error => {
    console.log(error);
  })
}
// SignUp response


// Login function
async function logPost() {

  app.post('/login', async (req: Request, res: Response) => {
    const { email, password }: UserData = req.body;
    
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    
    if(!user) {
      return res.status(401).json({ message: 'User not found :(' });
    }
    
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if(!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  });

}
// Login function

// Verifying password
async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return Bun.password.verify(plainPassword, hashedPassword);
}
// Verifying password

// Login response
async function login(data: UserData) {
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    console.log(response.json());
  })
  .catch(error => {
    console.log(error);
  })
}
// Login response

const logged = ref<boolean>(false);
const user = ref<User>({
  id: 1,
  email: 'daidaso',
  password: 'gay123',
});

</script>

<template>
  <div class="text-slate-100 h-full w-full">
    <Main v-if="logged" :user="user!" />
    <Login v-else @login="login($event)" @sign-up="signUp($event)" />
  </div>
</template>
