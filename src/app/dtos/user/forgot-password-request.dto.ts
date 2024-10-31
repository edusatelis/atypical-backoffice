export abstract class ForgotPasswordRequestDto {
    email!: string;
    code!: string;
    password!: string;
}