import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {

        // 1. Create DTO model

        const {email, name, phone, password} = registerDto;

        // 2. Check if user already exists

        const existingUser = await this.prisma.user.findUnique({where: {email}});

        // 3. If user exists, throw an exception

        if(existingUser) {
            throw new BadRequestException('This user already exists');
        }

        // 4. Hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create the user

        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                phone,
                password: hashedPassword
            }
        });

        const {password: _, ...userWithoutPassword} = user;

        return {
            message: 'Usuario registrado exitosamente',
            user: userWithoutPassword,
        };
    }

    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;

        // 1. Check if user exists

        const user = await this.prisma.user.findUnique({where: {email}});

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2. Check if password is correct

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3. Generate JWT token

        const payload = {sub: user.id, email: user.email};
        const token = await this.jwtService.signAsync(payload);

        return {
            message: 'Logged successfully',
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    }
}
