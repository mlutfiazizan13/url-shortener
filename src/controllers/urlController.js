const db = require("../models/db");

module.exports = {
    redirectToOriginalUrl: async (req, res) => {
        const { shortCode } = req.params;
        try {
            const urlEntry = await db.Url.findOne({ where: { shortCode } });
            if (!urlEntry) {
                return res.status(404).json({ message: 'URL not found' });
            }
            // Check for expiration
            if (urlEntry.expiresAt && new Date() > urlEntry.expiresAt) {
                return res.status(410).json({ message: 'URL has expired' });
            }
            // Log the click (implementation omitted for brevity)
            await db.Click.create({ urlId: urlEntry.id, clickedAt: new Date() });
            // Redirect to the original URL
            res.redirect(urlEntry.originalUrl);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    createUrl: async (req, res) => {    
        // Implementation for creating a shortened URL
        try {
            const { originalUrl, expiresAt } = req.body;
            const userId = req.user.userId; // Assuming userId is set in req.user by auth middleware

            // Generate a unique short code
            const shortCode = generateUniqueShortCode(); // Implement this function as needed

            const newUrl = await db.Url.create({
                originalUrl,
                shortCode,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                userId
            });

            res.status(201).json({ 
                message: 'URL shortened successfully', 
                shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}` 
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getUrlStats: async (req, res) => {    
        // Implementation for retrieving URL statistics
        try {
            const { shortCode } = req.params;
            const urlEntry = await db.Url.findOne({ 
                where: { shortCode },
                include: [{ model: db.Click, as: 'clicks' }]
            });
            if (!urlEntry) {
                return res.status(404).json({ message: 'URL not found' });
            }

            const stats = {
                originalUrl: urlEntry.originalUrl,
                shortCode: urlEntry.shortCode,
                createdAt: urlEntry.createdAt,
                expiresAt: urlEntry.expiresAt,
                totalClicks: urlEntry.clicks.length,
                clicks: urlEntry.clicks.map(click => ({ clickedAt: click.clickedAt }))
            };

            res.status(200).json({ message: 'URL statistics retrieved successfully', stats });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    deleteUrl: async (req, res) => {    
        // Implementation for deleting a shortened URL
        try {
            const { shortCode } = req.params;
            const userId = req.user.userId; // Assuming userId is set in req.user by auth middleware

            const urlEntry = await db.Url.findOne({ where: { shortCode, userId } });
            if (!urlEntry) {
                return res.status(404).json({ message: 'URL not found or unauthorized' });
            }

            await urlEntry.destroy();

            res.status(200).json({ message: 'URL deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};