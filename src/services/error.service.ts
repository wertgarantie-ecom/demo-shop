import { NextFunction, Request, Response } from "express";


export const errorService = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error(err)

    res.status(err.status || 500).render('pages/error', {
        pageTitle: 'Internal server error',
        pagePath: "",
        error: process.env.NODE_ENV === 'local' ? err.message : 'Oops, something went wrong...'
    });
}

/**
 * Catch page not found errors
 */
export const pageNotFoundService = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('pages/error', {
        pageTitle: 'Page Not Found',
        pagePath: "",
        error: 'Nothing to see here...'
    });
}