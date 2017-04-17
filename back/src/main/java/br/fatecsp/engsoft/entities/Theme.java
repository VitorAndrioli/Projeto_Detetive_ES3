package br.fatecsp.engsoft.entities;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import br.fatecsp.engsoft.domain.ThemeRequest;
import lombok.Data;

@Entity
@Table(name="theme")
@Data
public class Theme {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private BigDecimal price;
	
	@OneToMany(mappedBy="theme",cascade=CascadeType.ALL)
	private List<Card> cards;

	public static Theme toEntity(ThemeRequest request){
		Theme theme = new Theme();
		theme.setName(request.getName());
		theme.setPrice(request.getPrice());
		return theme;
	}
	
}
