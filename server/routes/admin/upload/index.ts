module.exports = async (req, res) => {
    const images = []
    if (req.files) {
        for (const reqKey in req.files) {
            if (req.files[reqKey].path) {
                // avatar[reqKey] = req.files[reqKey].path.split('public')[1];
                images.push({
                    [reqKey]: req.files[reqKey].path.split('public')[1]
                })
            }
        }
    }
    res.send(images)
}
