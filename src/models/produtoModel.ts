import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Produto extends Model {
    declare id: number;
    declare nome: string;
    declare preco: number;

    estaEmPromocao(): boolean {
        return this.preco < 100;
    }
}

Produto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "produtos",
        timestamps: false
    }
);

export default Produto;