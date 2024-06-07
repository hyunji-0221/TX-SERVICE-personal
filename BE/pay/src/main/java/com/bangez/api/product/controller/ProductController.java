package com.bangez.api.product.controller;

import com.bangez.api.product.model.ProductDTO;
import com.bangez.api.product.model.ProductModel;
import com.bangez.api.product.service.ProductService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/product")
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "dd")})
public class ProductController {

    private final ProductService service;

    @GetMapping(path = "/list")
    public ResponseEntity<List<ProductDTO>> findAll(){
        return ResponseEntity.ok(service.getAllPossibleProducts());
    }

}
