interface IUserGetDto {
  id: number;
  email: string;
  firstname?: string | null;
  lastname?: string | null;
  avatarUrl?: string | null;
}

export class UserGetDto {
  id: number;
  email: string;
  firstname?: string | null;
  lastname?: string | null;
  avatarUrl?: string | null;

  constructor(data?: IUserGetDto) {
    if (data) {
      this.id = data['id'];
      this.email = data['email'];
      this.firstname = data['firstname'];
      this.lastname = data['lastname'];
      this.avatarUrl = data['avatarUrl'];
    }
  }
}
