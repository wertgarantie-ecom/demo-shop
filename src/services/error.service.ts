import { NextFunction, Request, Response } from "express";

/**
 * Cotroller to catch and process all application errors
 */
// export const errorService = (err: any, req: Request, res: Response, next: NextFunction) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error', { title: 'Error' });
// }

export const errorService = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error(err)

    res.status(err.status || 500).render('pages/error', {
        pageTitle: 'Internal server error',
        error: process.env.NODE_ENV === 'local' ? err.message : 'Oops, something went wrong...'
    });
}

/**
 * Catch page not found errors
 */
export const pageNotFoundService = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('pages/error', {
        pageTitle: 'Page Not Found',
        error: 'Nothing to see here...'
    });
}