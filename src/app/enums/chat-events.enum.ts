export enum ChatEventsEnum {
    PATH = '/socket/chat',
    SEND_MESSAGE = 'SEND_MESSAGE',
    REQUEST_MESSAGE = 'REQUEST_MESSAGE',
    RESPONSE_MESSAGE = 'RESPONSE_MESSAGE',
    RESPONSE_MESSAGE_IDENTIFIER = 'RESPONSE_MESSAGE_IDENTIFIER',
    REQUEST_JOIN_ROOM_IDENTIFIER = 'REQUEST_JOIN_ROOM_IDENTIFIER',

    SEND_MESSAGE_BACKOFFICE = 'SEND_MESSAGE_BACKOFFICE',
    REQUEST_MESSAGE_BACKOFFICE = 'REQUEST_MESSAGE_BACKOFFICE',
    RESPONSE_MESSAGE_BACKOFFICE = 'RESPONSE_MESSAGE_BACKOFFICE',
    RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE = 'RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE',
    REQUEST_JOIN_ROOM_IDENTIFIER_BACKOFFICE = 'REQUEST_JOIN_ROOM_IDENTIFIER_BACKOFFICE'
}
    