package com.example.EMS.employer.entity;


import com.example.EMS.common.entity.IdBaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "COMPANY_SEQ")
@ToString
public class Employer extends IdBaseEntity {

    @Column(name = "NAME", unique = true)
    private String name;

    @Column(name = "Type")
    private String type;

    @Column(name = "Benefit", length = 2000)
    private String benefit;

    @Column(name = "Contact")
    private String contact;
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "CITY")
    private String city;

    @Column(name = "STATE")
    private String state;

    @Column(name = "ZIP")
    private String zip;

    @Column(name = "DESCRIPTION", length = 3000)
    private String description;

    @Column(name = "REASON", length = 3000)
    private String reason;

    public Employer(String name, String type, String benefit, String contact, String address, String city, String state, String zip, String description, String reason) {
        this.name = name;
        this.type = type;
        this.benefit = benefit;
        this.contact = contact;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.description = description;
        this.reason = reason;
    }
}
