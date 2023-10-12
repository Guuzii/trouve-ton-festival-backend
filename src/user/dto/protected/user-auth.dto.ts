interface IUserAuthDto {
  id: number;
  email: string;
  password: string;
}

export class UserAuthDto {
  id: number;
  email: string;
  password: string;

  constructor(data?: IUserAuthDto) {
    if (data) {
      this.id = data['id'];
      this.email = data['email'];
      this.password = data['password'];
    }
  }
}
