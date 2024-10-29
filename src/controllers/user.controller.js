export async function getProfileController(req, res) {
  try {
    const user = req.user;
    res.json({
      success: true,
      msg: "Profile fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
}
