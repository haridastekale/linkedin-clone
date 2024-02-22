import Head from "next/head";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { connectToDatabase } from "../util/mongodb";
import { Avatar } from "@mui/material";
import Image from "next/image";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";

function getuser({ users }) {
    console.log(users);
    const { data: session } = useSession();


    return (
        <div className="space-y-10 relative">

            <Head>
                <title>Linkedin-home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <Header />

            <div className="item-center pl-5 pr-5">
                <div className="bg-white dark:bg-[#1D2226] py-2 rounded-lg space-y-2 overflow-hidden border border-gray-300 dark:border-none overflow-x-scroll ">

                    {/* { */}
                    
                    <div className="flex items-center font-bold px-2  ">
                        {users.map((user, index) => {
                            return (
                                <div key={index} className="min-w-max max-w-lg float-left mr-2 ml-2  ">
                                    <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-[#dfdbdb]">
                                        <div className="relative w-full h-14">
                                            <Image src="https://rb.gy/i26zak" layout="fill" priority />
                                        </div>
                                        <Avatar
                                            src={user.image}
                                            className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
                                        />
                                        <div className="mt-5 py-4 space-x-0.5">
                                            <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer p-2">
                                                {user.name}
                                            </h4>
                                            <p className="text-black/60 dark:text-white/75 text-sm p-2">
                                                {user.email}
                                            </p>

                                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-2 mb-2 rounded-full">
                                                Follow
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* // } */}
                </div>
            </div>
        </div>
    );
}

export default getuser

export async function getServerSideProps(context) {
    // Check if the user is authenticated on the server...
    // const session = await getSession(context);
    // if (!session) {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/home",
    //     },
    //   };
    // }

    const { db } = await connectToDatabase();

    // const db = client.db("MONGODB_DB");

    const users = await db.collection("users").find({}).toArray();
 

    return {
        props: {
            // users
            // session,
            users: users.map((users) => ({
                _id: users._id.toString(),
                name: users.name,
                email: users.email,
                image: users.image,
                // userImg: post.userImg,
                // createdAt: post.createdAt,
            })),
        },
    };
}