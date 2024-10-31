import { AddressDto } from "./user-address.dto";
import { UserStatusEnum } from "./user-status.enum";
import { UserTypeVisitEnum } from "./user-type-visit.enum";
import { UserTypeEnum } from "./user-type.enum";

export abstract class UserRegisterRequestDto {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    crm?: string;
    bio?: string;
    address?: AddressDto;
    especialidades?: Array<any>;
    socialMedia?: Array<any>;
    media?: Array<any>;
    agreements?: Array<any>;
    services?: Array<any>;
    formation?: Array<any>;
    experiences?: Array<any>;
    recommendation?: Array<any>;
    openTeams?: boolean;
    openSupervise?: boolean;
    profile_img?: string;
    password?: string;
    lastAccess?: Date;
    birthDate?: Date;
    status?: UserStatusEnum;
    type?: UserTypeEnum;
    typeVisit?: UserTypeVisitEnum;
}