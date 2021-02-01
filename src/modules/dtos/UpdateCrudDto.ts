import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateCrudDto {
  @ApiProperty({ example: "First Name" })
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({ example: "Last Name" })
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({ example: "Phone Number" })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({ example: "Address " })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "Age " })
  @IsNotEmpty()
  age: string;
  
  @ApiProperty({ example: "Image " })
  formImage: string;
  @ApiProperty({ example: "Image " })
  image: string;
  
  @ApiProperty({ example: "user ID" })
  createdBy: string;
}
