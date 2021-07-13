
interface IUser
{
    id: any;
    name: string;
    room: string;
}

const users: Array<IUser> = [];

const add_user = ({ id, name, room }: any) =>
{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existing_user = users.find((user: IUser) => user.room === room && 
                                            user.name === name);

    if (existing_user) return { error: 'Username is already taken' }

    const user: IUser = { id, name, room };

    users.push(user);

    return { user };
}

const remove_user = (id: any) => 
{
    const index = users.findIndex((user: IUser) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const get_user = (id: any) => 
    
    users.find((user: IUser) => user.id === id);

const get_users_in_room = (room: string) => 
    
    users.filter((user: IUser) => user.room === room);

module.exports = { add_user, 
                    remove_user, 
                    get_user, 
                    get_users_in_room }