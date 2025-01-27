const Gadget = require('./models/gadgets');
const sequelize = require('./database');

async function seedGadgets() {
    try {
        await sequelize.sync();

        await Gadget.bulkCreate([
            { name: "Spy Camera" },
            { name: "Invisible Cloak" },
            { name: "Grappling Hook" },
            { name: "Laser Pen" },
            { name: "Night Vision Goggles" }
        ]);

        console.log("Gadgets added successfully!");
    } catch (err) {
        console.error("Error seeding gadgets:", err);
    } finally {
        process.exit();
    }
}

seedGadgets();
