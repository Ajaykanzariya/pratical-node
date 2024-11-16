import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import { STATUS } from "../utils/app-enumration";

// Define the attributes of the Project model
interface ProjectAttributes {
  id: number;
  name: string;
  description?: string;
  status: STATUS; // Use the enum for status
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

// Define the creation attributes (all attributes except `id` and `created_at` can be passed)
interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id" | "created_at" | "is_deleted" | "updated_at"> {}

// Extend the Sequelize Model class
class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public status!: STATUS; // Use the STATUS enum here
  public due_date!: Date;
  public created_at!: Date;
  public updated_at!: Date;
  public is_deleted!: boolean;

  // Automatically add createdAt and updatedAt timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Project model with Sequelize
Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)), // Use enum values dynamically
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value is '0' (not deleted)
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Project",
    tableName: "project",
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Converts camelCase to snake_case in database fields
  }
);

export default Project;
