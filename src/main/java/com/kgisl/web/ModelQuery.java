package com.kgisl.web;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ModelQuery {
    private final String jdbcURL;
    private final String jdbcUsername;
    private final String jdbcPassword;
    private Connection jdbcConnection;

    public ModelQuery(String jdbcURL, String jdbcUsername, String jdbcPassword) {
        this.jdbcURL = jdbcURL;
        this.jdbcUsername = jdbcUsername;
        this.jdbcPassword = jdbcPassword;
    }

    protected void connect() throws SQLException {
        if (jdbcConnection == null || jdbcConnection.isClosed()) {
            jdbcConnection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
        }
    }

    protected void disconnect() throws SQLException {
        if (jdbcConnection != null && !jdbcConnection.isClosed()) {
            jdbcConnection.close();
        }
    }

    public List<Model> listAllModels() throws SQLException {
        String sql = "SELECT * FROM model";
        List<Model> modelList = new ArrayList<>();
        connect();
        try (Statement statement = jdbcConnection.createStatement(); 
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                Model model = new Model();
                model.setId(resultSet.getInt("id"));
                model.setModelName(resultSet.getString("modelName"));
                model.setYear(resultSet.getInt("year"));
                model.setPrice(resultSet.getInt("price"));
                model.setCompany(resultSet.getString("company"));
                modelList.add(model);
            }
        } finally {
            disconnect();
        }
        return modelList;
    }

    public void insertModel(Model model) throws SQLException {
        String sql = "INSERT INTO model (id, modelName, year, price, company) VALUES (?, ?, ?, ?, ?)";
        connect();
        try (PreparedStatement statement = jdbcConnection.prepareStatement(sql)) {
            statement.setInt(1, model.getId());
            statement.setString(2, model.getModelName());
            statement.setInt(3, model.getYear());
            statement.setInt(4, model.getPrice());
            statement.setString(5, model.getCompany());
            statement.executeUpdate();
        } finally {
            disconnect();
        }
    }

    public void updateModel(Model model) throws SQLException {
        String sql = "UPDATE model SET modelName = ?, year = ?, price = ?, company = ? WHERE id = ?";
        connect();
        try (PreparedStatement statement = jdbcConnection.prepareStatement(sql)) {
            statement.setString(1, model.getModelName());
            statement.setInt(2, model.getYear());
            statement.setInt(3, model.getPrice());
            statement.setString(4, model.getCompany());
            statement.setInt(5, model.getId());
            statement.executeUpdate();
        } finally {
            disconnect();
        }
    }

    public void deleteModel(int id) throws SQLException {
        String sql = "DELETE FROM model WHERE id = ?";
        connect();
        try (PreparedStatement statement = jdbcConnection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } finally {
            disconnect();
        }
    }
}
