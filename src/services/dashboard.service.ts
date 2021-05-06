import { NextFunction, Request, Response } from "express";


/**
 * Render dashboard
 */
export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {

    // render page
    res.render('pages/dashboard', {
        pageTitle: "Dashboard",
        pagePath: "dashboard"
    });
}

