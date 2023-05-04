import express from 'express';

export default function routes(app : any) : void {
    app.use(express.json());
    // app.use('/api/me', );
    // app.use('/api/auth', );
    // app.use('/api/user');
    app.use('/', (req : any, res : any) => {
        res.send('hello beautiful');
    });
    // app.use(error);
}


