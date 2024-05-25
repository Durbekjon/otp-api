import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({ description: 'Token jwt' })
  token: string;

  @ApiProperty({ description: 'Expires in' })
  expiresIn: string;
}

export class RefreshToken {
  @ApiProperty({ description: 'Token id' })
  id: string;

  @ApiProperty({ description: 'Token jwt' })
  token: string;

  @ApiProperty({ description: 'Expires in' })
  expiresIn: string;
}

export class UserAuthResponseDto {
  @ApiProperty({ description: "User's access token", type: AccessToken })
  accessToken: AccessToken;

  @ApiProperty({ description: "User's refresh token", type: RefreshToken })
  refreshToken: RefreshToken;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ description: "Account's access token", type: AccessToken })
  accessToken: AccessToken;

  @ApiProperty({ description: "Account's refresh token", type: RefreshToken })
  refreshToken: RefreshToken;
}
